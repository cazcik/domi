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

BUILD_ALL=true
BUILD_WEB=false
BUILD_API=false
BUILD_PROXY=false
NO_CACHE=false
PUSH_IMAGES=false
TAG="latest"
USERNAME=""

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
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -w, --web           Build only web service"
    echo "  -a, --api           Build only API service"
    echo "  -p, --proxy         Build only proxy service"
    echo "  -t, --tag TAG       Set image tag (default: latest)"
    echo "  --no-cache          Build without using cache"
    echo "  --push              Push images after building"
    echo "  --username USER     Docker Hub username (required when using --push)"
    echo ""
    echo "Examples:"
    echo "  $0                           Build all services"
    echo "  $0 -w                        Build only web service"
    echo "  $0 -a -p                     Build API and proxy services"
    echo "  $0 --tag v1.0.0              Build all services with tag v1.0.0"
    echo "  $0 --no-cache                Build all services without cache"
    echo "  $0 --push --username cazcik  Build and push all services to Docker Hub"
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_usage
                exit 0
                ;;
            -w|--web)
                BUILD_ALL=false
                BUILD_WEB=true
                shift
                ;;
            -a|--api)
                BUILD_ALL=false
                BUILD_API=true
                shift
                ;;
            -p|--proxy)
                BUILD_ALL=false
                BUILD_PROXY=true
                shift
                ;;
            -t|--tag)
                TAG="$2"
                shift 2
                ;;
            --no-cache)
                NO_CACHE=true
                shift
                ;;
            --push)
                PUSH_IMAGES=true
                shift
                ;;
            --username)
                USERNAME="$2"
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

check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "docker is not running or not accessible"
        exit 1
    fi
    print_success "docker is running"
}

build_service() {
    local service_name=$1
    local build_context=$2
    local dockerfile=$3
    
    print_status "building $service_name service..."
    
    local build_args=""
    if [ "$NO_CACHE" = true ]; then
        build_args="--no-cache"
    fi
    
    local image_name="${PROJECT_NAME}-${service_name}:${TAG}"
    
    if docker build $build_args -t "$image_name" -f "$dockerfile" "$build_context"; then
        print_success "$service_name service built successfully as $image_name"
        
        if [ "$PUSH_IMAGES" = true ]; then
            if [ -z "$USERNAME" ]; then
                print_error "username is required when pushing images. use --username"
                exit 1
            fi
            
            local push_image_name="${USERNAME}/${image_name}"
            
            print_status "tagging $image_name as $push_image_name..."
            docker tag "$image_name" "$push_image_name"
            
            print_status "pushing $push_image_name..."
            if docker push "$push_image_name"; then
                print_success "$push_image_name pushed successfully"
            else
                print_error "failed to push $push_image_name"
                exit 1
            fi
        fi
    else
        print_error "failed to build $service_name service"
        exit 1
    fi
}

build_all_services() {
    print_status "building all services for project: $PROJECT_NAME"
    print_status "tag: $TAG"
    if [ "$NO_CACHE" = true ]; then
        print_warning "building without cache"
    fi
    if [ "$PUSH_IMAGES" = true ]; then
        if [ -z "$USERNAME" ]; then
            print_error "username is required when pushing images. use --username"
            exit 1
        fi
        print_warning "images will be pushed to docker hub as $USERNAME/${PROJECT_NAME}-*:$TAG"
    fi
    echo ""
    
    build_service "$WEB_SERVICE" "./packages/web" "./packages/web/Dockerfile"
    build_service "$API_SERVICE" "./packages/api" "./packages/api/Dockerfile"
    build_service "$PROXY_SERVICE" "." "./Dockerfile"
}

build_specific_services() {
    print_status "building specific services for project: $PROJECT_NAME"
    print_status "tag: $TAG"
    if [ "$NO_CACHE" = true ]; then
        print_warning "building without cache"
    fi
    if [ "$PUSH_IMAGES" = true ]; then
        if [ -z "$USERNAME" ]; then
            print_error "username is required when pushing images. use --username"
            exit 1
        fi
        print_warning "images will be pushed to docker hub as $USERNAME/${PROJECT_NAME}-*:$TAG"
    fi
    echo ""
    
    if [ "$BUILD_WEB" = true ]; then
        build_service "$WEB_SERVICE" "./packages/web" "./packages/web/Dockerfile"
    fi
    
    if [ "$BUILD_API" = true ]; then
        build_service "$API_SERVICE" "./packages/api" "./packages/api/Dockerfile"
    fi
    
    if [ "$BUILD_PROXY" = true ]; then
        build_service "$PROXY_SERVICE" "." "./Dockerfile"
    fi
}

show_summary() {
    echo ""
    print_success "build completed successfully!"
    echo ""
    print_status "built images:"
    
    if [ "$BUILD_ALL" = true ] || [ "$BUILD_WEB" = true ]; then
        echo "  - ${PROJECT_NAME}-${WEB_SERVICE}:${TAG}"
    fi
    
    if [ "$BUILD_ALL" = true ] || [ "$BUILD_API" = true ]; then
        echo "  - ${PROJECT_NAME}-${API_SERVICE}:${TAG}"
    fi
    
    if [ "$BUILD_ALL" = true ] || [ "$BUILD_PROXY" = true ]; then
        echo "  - ${PROJECT_NAME}-${PROXY_SERVICE}:${TAG}"
    fi
    
    if [ "$PUSH_IMAGES" = true ] && [ -n "$USERNAME" ]; then
        echo ""
        print_status "pushed images:"
        if [ "$BUILD_ALL" = true ] || [ "$BUILD_WEB" = true ]; then
            echo "  - ${USERNAME}/${PROJECT_NAME}-${WEB_SERVICE}:${TAG}"
        fi
        if [ "$BUILD_ALL" = true ] || [ "$BUILD_API" = true ]; then
            echo "  - ${USERNAME}/${PROJECT_NAME}-${API_SERVICE}:${TAG}"
        fi
        if [ "$BUILD_ALL" = true ] || [ "$BUILD_PROXY" = true ]; then
            echo "  - ${USERNAME}/${PROJECT_NAME}-${PROXY_SERVICE}:${TAG}"
        fi
    fi
    
    echo ""
    print_status "to run the application, use:"
    echo "  docker-compose up"
    echo ""
    print_status "to run with the built images, use:"
    echo "  docker-compose up --no-build"
}

main() {
    parse_args "$@"
    check_docker
    
    if [ "$BUILD_ALL" = true ]; then
        build_all_services
    else
        build_specific_services
    fi
    
    show_summary
}

main "$@"
