#!/usr/bin/env bash

PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

npm cache clean --force
npm install
if [[ "${TYPE}" == "local" ]];then
    sed -i "s/'http.*'/'http:\/\/s-gateway-qa.k8s.zhihuiya.com\/s-data-admin-api'/g" .env*
    npm run dev-build
else
    if [[ "${BLUE}" == "true" ]];then
        sed -i "s/'http.*'/'http:\/\/dpp-b.backend.patsnap.com'/g" .env*
    else
        sed -i "s/'http.*'/'http:\/\/dpp.backend.patsnap.com'/g" .env*
    fi
    npm run build
fi

cp ./Dockerfile ./dist

cd ./dist
mkdir -p monitor/health && echo pang > monitor/health/index.html

CI_COMMIT_REF_NAME=$(echo $CI_COMMIT_REF_NAME | sed 's/\//./g')
IMAGE_NAME=${PROJECT_TYPE}-${TEAM}-$PROJECT_NAME
IMAGE_VERSION=${CI_COMMIT_REF_NAME}-$CI_PIPELINE_ID
IMAGE=${PRIVATE_DTR_URL}/${TEAM}/${IMAGE_NAME}:${IMAGE_VERSION}
echo $IMAGE

if [[ $AWS_DTR_URL != *local-dtr.zhihuiya.com* ]]; then
    sed -i "s/local-dtr.zhihuiya.com\/base/${PRIVATE_DTR_URL}\/ops-basic/g" Dockerfile
fi

docker build -t $IMAGE ./
docker push $IMAGE

cd ..
