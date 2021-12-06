#!/bin/bash

sudo amazon-linux-extras install epel
sudo yum install nodejs -y
sudo npm install --global yarn
sudo yarn global add serve
sudo npm install forever -g