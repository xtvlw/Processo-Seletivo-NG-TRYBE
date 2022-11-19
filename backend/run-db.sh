sudo docker run --name db -e POSTGRES_PASSWORD=admin -dp 5432:5432 postgres &&
sudo docker exec -it db bash