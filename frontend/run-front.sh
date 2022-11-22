sudo docker build -t react ./frontend/ &&
sudo docker run --network host -d react &&
echo "app running on port: 3000"