# QuizApp/terraform/variables.tf

# --------------------------------------------------
#  各種変数の定義
# --------------------------------------------------
# リージョン変数の定義
variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-northeast-1"
}

#ドメイン名変数の定義
variable "domain_name" {
  description = "Domain name for the website"
  type        = string
}