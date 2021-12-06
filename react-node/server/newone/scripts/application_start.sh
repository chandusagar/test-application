#!/bin/bash

sudo forever stopall
sudo forever start /home/ec2-user/build/server.js
sudo rm -rf /opt/codedeploy-agent/deployment-root/b32a90c3-4958-4999-8b74-881818eae095/*