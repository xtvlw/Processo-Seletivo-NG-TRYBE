sudo docker build -t app . &&
sudo docker run --network host -d app &&
echo "API running on port: 4000"