### Objectives

- [x] Create an AWS account ([watch youtube tutorial](https://www.youtube.com/watch?v=XhW17g73fvY "How to Create AWS Account Free in 5 Minutes"))
- [x] Create 2 AWS EC2 linux instances
- [x] Install and setup Jenkins server in EC2-instance-1
- [x] Install and setup Apache Tomcat server in EC2-instance-2
- [x] Create a sample html website and push the code into github
- [x] Setup githut-webhook so that jenkins runs & deploy code into tomcat server when ever we push the code to github
- [ ] Are we done???

### Setup Jenkins server

```bash
sudo yum update -y

sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

sudo amazon-linux-extras install java-11-openjdk

sudo systemctl start jenkins
```
