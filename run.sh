#!/usr/bin/env bash
BUILD_ID=gpweb
cd /data/jenkins/deploy
cp /var/lib/jenkins/workspace/gp-web ./
cd gp-web
nohup cnpm run dev > nohup.out 2>&1 &