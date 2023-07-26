sudo docker stop dashboard_app
sudo docker rm dashboard_app
sudo docker rmi dashboard_ms:1
sudo docker build -t dashboard_ms:1 .
sudo docker run -d -p 4200:80 --network cqube_net --name dashboard_app dashboard_ms:1
