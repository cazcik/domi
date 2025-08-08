#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_NAME="domi"
WEB_SERVICE="web"
API_SERVICE="api"
PROXY_SERVICE="proxy"

DEPLOY_ALL=true
DEPLOY_WEB=false
DEPLOY_API=false
DEPLOY_PROXY=false
TAG="latest"
HOST=""
USER=""
KEY=""
COMPOSE_FILE="compose.prod.yaml"
PROJECT_DIR="/opt/domi"

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_usage() {
    echo "Usage: $0 [OPTIONS] --tag TAG --host HOST --user USER --key KEY"
    echo ""
    echo "Required Options:"
    echo "  --tag TAG           Image tag to deploy (e.g., v1.0.0)"
    echo "  --host HOST         VPS hostname or IP address"
    echo "  --user USER         SSH username"
    echo "  --key KEY           Path to SSH private key"
    echo ""
    echo "Optional Options:"
    echo "  -h, --help          Show this help message"
    echo "  -w, --web           Deploy only web service"
    echo "  -a, --api           Deploy only API service"
    echo "  -p, --proxy         Deploy only proxy service"
    echo "  --compose-file FILE Use specific compose file (default: compose.prod.yaml)"
    echo "  --project-dir DIR   Project directory on VPS (default: /opt/domi)"
    echo ""
    echo "Examples:"
    echo "  $0 --tag v1.0.0 --host my-vps.com --user deploy --key ~/.ssh/id_rsa"
    echo "  $0 --tag v1.2.3 --host 192.168.1.100 --user root --key ~/.ssh/deploy_key -w"
    echo "  $0 --tag latest --host my-vps.com --user deploy --key ~/.ssh/id_rsa --compose-file compose.staging.yaml"
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_usage
                exit 0
                ;;
            -w|--web)
                DEPLOY_ALL=false
                DEPLOY_WEB=true
                shift
                ;;
            -a|--api)
                DEPLOY_ALL=false
                DEPLOY_API=true
                shift
                ;;
            -p|--proxy)
                DEPLOY_ALL=false
                DEPLOY_PROXY=true
                shift
                ;;
            --tag)
                TAG="$2"
                shift 2
                ;;
            --host)
                HOST="$2"
                shift 2
                ;;
            --user)
                USER="$2"
                shift 2
                ;;
            --key)
                KEY="$2"
                shift 2
                ;;
            --compose-file)
                COMPOSE_FILE="$2"
                shift 2
                ;;
            --project-dir)
                PROJECT_DIR="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
}

validate_args() {
    if [ -z "$TAG" ]; then
        print_error "tag is required. use --tag"
        exit 1
    fi
    
    if [ -z "$HOST" ]; then
        print_error "host is required. use --host"
        exit 1
    fi
    
    if [ -z "$USER" ]; then
        print_error "user is required. use --user"
        exit 1
    fi
    
    if [ -z "$KEY" ]; then
        print_error "key is required. use --key"
        exit 1
    fi
    
    if [ ! -f "$KEY" ]; then
        print_error "ssh key file not found: $KEY"
        exit 1
    fi
}

check_ssh_connection() {
    print_status "testing ssh connection to $USER@$HOST..."
    
    if ssh -i "$KEY" -o ConnectTimeout=10 -o BatchMode=yes "$USER@$HOST" "echo 'ssh connection successful'" > /dev/null 2>&1; then
        print_success "ssh connection established"
    else
        print_error "failed to establish ssh connection to $USER@$HOST"
        print_error "please check your ssh key and connection details"
        exit 1
    fi
}

check_docker_on_vps() {
    print_status "checking docker availability on vps..."
    
    if ssh -i "$KEY" "$USER@$HOST" "docker --version" > /dev/null 2>&1; then
        print_success "docker is available on vps"
    else
        print_error "docker is not available on vps"
        exit 1
    fi
    
    if ssh -i "$KEY" "$USER@$HOST" "docker compose version" > /dev/null 2>&1; then
        print_success "docker compose is available on vps"
    else
        print_error "docker compose is not available on vps"
        exit 1
    fi
}

check_project_directory() {
    print_status "checking project directory on vps..."
    
    if ssh -i "$KEY" "$USER@$HOST" "[ -d \"$PROJECT_DIR\" ]" > /dev/null 2>&1; then
        print_success "project directory exists: $PROJECT_DIR"
    else
        print_error "project directory not found: $PROJECT_DIR"
        print_error "please ensure the project is properly set up on the VPS"
        exit 1
    fi
    
    if ssh -i "$KEY" "$USER@$HOST" "[ -f \"$PROJECT_DIR/$COMPOSE_FILE\" ]" > /dev/null 2>&1; then
        print_success "compose file found: $COMPOSE_FILE"
    else
        print_error "compose file not found: $PROJECT_DIR/$COMPOSE_FILE"
        exit 1
    fi
}

pull_images() {
    local service_name=$1
    local image_name="cazcik/${PROJECT_NAME}-${service_name}:${TAG}"
    
    print_status "pulling $image_name on VPS..."
    
    if ssh -i "$KEY" "$USER@$HOST" "cd $PROJECT_DIR && docker pull $image_name" > /dev/null 2>&1; then
        print_success "$image_name pulled successfully"
    else
        print_error "failed to pull $image_name"
        exit 1
    fi
}

update_compose_file() {
    local service_name=$1
    local image_name="cazcik/${PROJECT_NAME}-${service_name}:${TAG}"
    
    print_status "updating $service_name service to use $image_name..."
    
    # Update the image tag in the compose file
    ssh -i "$KEY" "$USER@$HOST" "cd $PROJECT_DIR && sed -i 's|image: cazcik/${PROJECT_NAME}-${service_name}:[^[:space:]]*|image: $image_name|g' $COMPOSE_FILE"
    
    print_success "$service_name service updated in compose file"
}

deploy_service() {
    local service_name=$1
    
    print_status "deploying $service_name service..."
    
    # Deploy the specific service with zero-downtime
    if ssh -i "$KEY" "$USER@$HOST" "cd $PROJECT_DIR && docker compose -f $COMPOSE_FILE up -d --no-deps $service_name" > /dev/null 2>&1; then
        print_success "$service_name service deployed successfully"
    else
        print_error "failed to deploy $service_name service"
        exit 1
    fi
}

check_service_health() {
    local service_name=$1
    local max_attempts=30
    local attempt=1
    
    print_status "checking health of $service_name service..."
    
    while [ $attempt -le $max_attempts ]; do
        if ssh -i "$KEY" "$USER@$HOST" "cd $PROJECT_DIR && docker compose -f $COMPOSE_FILE ps $service_name | grep -q 'Up'" > /dev/null 2>&1; then
            print_success "$service_name service is healthy"
            return 0
        fi
        
        print_status "waiting for $service_name service to be ready... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name service failed health check after $max_attempts attempts"
    return 1
}

deploy_all_services() {
    print_status "deploying all services for project: $PROJECT_NAME"
    print_status "tag: $TAG"
    print_status "host: $HOST"
    print_status "compose file: $COMPOSE_FILE"
    echo ""
    
    # Pull all images first
    pull_images "$WEB_SERVICE"
    pull_images "$API_SERVICE"
    pull_images "$PROXY_SERVICE"
    
    # Update compose file for all services
    update_compose_file "$WEB_SERVICE"
    update_compose_file "$API_SERVICE"
    update_compose_file "$PROXY_SERVICE"
    
    # Deploy services in dependency order
    deploy_service "$WEB_SERVICE"
    check_service_health "$WEB_SERVICE"
    
    deploy_service "$API_SERVICE"
    check_service_health "$API_SERVICE"
    
    deploy_service "$PROXY_SERVICE"
    check_service_health "$PROXY_SERVICE"
}

deploy_specific_services() {
    print_status "deploying specific services for project: $PROJECT_NAME"
    print_status "tag: $TAG"
    print_status "host: $HOST"
    print_status "compose file: $COMPOSE_FILE"
    echo ""
    
    if [ "$DEPLOY_WEB" = true ]; then
        pull_images "$WEB_SERVICE"
        update_compose_file "$WEB_SERVICE"
        deploy_service "$WEB_SERVICE"
        check_service_health "$WEB_SERVICE"
    fi
    
    if [ "$DEPLOY_API" = true ]; then
        pull_images "$API_SERVICE"
        update_compose_file "$API_SERVICE"
        deploy_service "$API_SERVICE"
        check_service_health "$API_SERVICE"
    fi
    
    if [ "$DEPLOY_PROXY" = true ]; then
        pull_images "$PROXY_SERVICE"
        update_compose_file "$PROXY_SERVICE"
        deploy_service "$PROXY_SERVICE"
        check_service_health "$PROXY_SERVICE"
    fi
}

show_deployment_summary() {
    echo ""
    print_success "deployment completed successfully!"
    echo ""
    print_status "deployed services:"
    
    if [ "$DEPLOY_ALL" = true ] || [ "$DEPLOY_WEB" = true ]; then
        echo "  - ${PROJECT_NAME}-${WEB_SERVICE}:${TAG}"
    fi
    
    if [ "$DEPLOY_ALL" = true ] || [ "$DEPLOY_API" = true ]; then
        echo "  - ${PROJECT_NAME}-${API_SERVICE}:${TAG}"
    fi
    
    if [ "$DEPLOY_ALL" = true ] || [ "$DEPLOY_PROXY" = true ]; then
        echo "  - ${PROJECT_NAME}-${PROXY_SERVICE}:${TAG}"
    fi
    
    echo ""
    print_status "deployment details:"
    echo "  - vps: $USER@$HOST"
    echo "  - project directory: $PROJECT_DIR"
    echo "  - compose file: $COMPOSE_FILE"
    echo ""
    print_status "to check service status, run:"
    echo "  ssh -i $KEY $USER@$HOST 'cd $PROJECT_DIR && docker compose -f $COMPOSE_FILE ps'"
    echo ""
    print_status "to view logs, run:"
    echo "  ssh -i $KEY $USER@$HOST 'cd $PROJECT_DIR && docker compose -f $COMPOSE_FILE logs -f'"
    echo ""
    print_status "to rollback to previous version, run:"
    echo "  $0 --tag <previous-tag> --host $HOST --user $USER --key $KEY"
}

main() {
    parse_args "$@"
    validate_args
    check_ssh_connection
    check_docker_on_vps
    check_project_directory
    
    if [ "$DEPLOY_ALL" = true ]; then
        deploy_all_services
    else
        deploy_specific_services
    fi
    
    show_deployment_summary
}

main "$@"
