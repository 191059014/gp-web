#!/usr/bin/env bash
file="/data/jenkins/deploy/gp-web"
if [[ -f "$file" ]]
then
   echo "backup last package start..."
   mv /data/jenkins/deploy/gp-web /data/jenkins/backup/gp-web.`date +%Y%m%d%H%M%S`
   echo "backup last package complete..."
fi
