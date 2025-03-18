group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "."
  dockerfile = "./common/docker/Dockerfile.client"
  tags = ["monorepo-template-frontend:latest"]
}

target "backend" {
	context = "."
	dockerfile = "./common/docker/Dockerfile.server"
	tags = ["monorepo-template-backend:latest"]
}