sudo docker build -t app . &&
sudo docker run -p 4000:4000 -d app &&
echo "API running on port: 4000"