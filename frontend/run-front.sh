sudo docker build -t react . &&
sudo docker run --network host -d react &&
echo "app running on port: 3000"