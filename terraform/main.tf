# QuizApp/terraform/main.tf

# --------------------------------------------------
# Terraformの定義
# --------------------------------------------------
# Terraformのバージョンとプロバイダとバックエンドの設定
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    bucket         = "terraform-state-hasegawa" # 作成したS3バケット名
    key            = "quiz-app/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-lock-table" # 作成したDynamoDBテーブル名
  }
}

# --------------------------------------------------
# プロバイダーの定義
# --------------------------------------------------
# 東京リージョン
provider "aws" {
  region = var.aws_region
}

# ACM用のバージニア北部リージョン
provider "aws" {
  alias  = "acm"
  region = "us-east-1"
}

# --------------------------------------------------
# S3の定義
# --------------------------------------------------
# S3バケットの作成
resource "aws_s3_bucket" "QuizApp_bucket" {
  bucket = var.domain_name
}

# S3バケットのパブリックアクセスブロックを無効化
resource "aws_s3_bucket_public_access_block" "QuizApp_bucket_public_access_block" {
  bucket = aws_s3_bucket.QuizApp_bucket.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}
# S3バケットポリシー
resource "aws_s3_bucket_policy" "QuizApp_bucket_policy" {
  bucket = aws_s3_bucket.QuizApp_bucket.id
  policy = jsonencode({
    "Version" = "2012-10-17",
    "Statement" = [
      {
        "Sid"    = "PublicReadGetObject",
        "Effect" = "Allow",
        "Principal" = "*",
        "Action" = ["s3:GetObject"],
        "Resource" = [
          "${aws_s3_bucket.QuizApp_bucket.arn}/*"
        ]
      }
    ]
  })
}

# 静的ウェブサイトホスティングの有効化
resource "aws_s3_bucket_website_configuration" "QuizApp_website" {
  bucket = aws_s3_bucket.QuizApp_bucket.id

  index_document {
    suffix = "index.html"
  }
}

# --------------------------------------------------
# CloudFrontの定義
# --------------------------------------------------
# CloudFrontディストリビューション
resource "aws_cloudfront_distribution" "QuizApp_cdn" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.QuizApp_website.website_endpoint
    origin_id   = var.domain_name

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["SSLv3", "TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.domain_name

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [
    var.domain_name,
    "www.${var.domain_name}"
  ]

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
  }
}

# --------------------------------------------------
# Route 53の定義
# --------------------------------------------------
# Route 53ゾーンデータの取得
data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

# ルートドメインのAレコード
resource "aws_route53_record" "root" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name  # ルートドメイン
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.QuizApp_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.QuizApp_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

# wwwサブドメインのAレコード
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}" # wwwサブドメイン
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.QuizApp_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.QuizApp_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

# ----------------------------------------------
# ACMの定義
# ----------------------------------------------

# ACMで証明書を発行
resource "aws_acm_certificate" "cert" {
  provider                  = aws.acm
  domain_name               = var.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["www.${var.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}

# DNS検証レコードを作成
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => dvo
  }

  allow_overwrite = true
  name            = each.value.resource_record_name
  type            = each.value.resource_record_type
  zone_id         = data.aws_route53_zone.main.zone_id
  records         = [each.value.resource_record_value]
  ttl             = 60
}

# 証明書の検証が完了するまで待つ
resource "aws_acm_certificate_validation" "cert_validation" {
  provider                = aws.acm
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
