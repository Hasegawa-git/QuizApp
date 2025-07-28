# QuizApp/terraform/outputs.tf

# --------------------------------------------------
# ドメイン名の出力
# --------------------------------------------------
#ドメイン名の出力
output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.QuizApp_cdn.domain_name
}