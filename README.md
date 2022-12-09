### Objectives

- [x] Create an AWS account ([watch youtube tutorial](https://www.youtube.com/watch?v=XhW17g73fvY "How to Create AWS Account Free in 5 Minutes"))
- [x] Create 2 AWS EC2 linux instances
- [x] Install and setup Jenkins server in EC2-instance-1
- [x] Install and setup Apache Tomcat server in EC2-instance-2
- [x] Create a sample html website and push the code into github
- [x] Setup githut-webhook so that jenkins runs & deploy code into tomcat server when ever we push the code to github
- [ ] Are we done???

---

### Setup Jenkins server

- Install Jenkins

```bash
sudo yum update -y

sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

sudo amazon-linux-extras install java-11-openjdk

sudo systemctl start jenkins

sudo cat /var/lib/jenkins/secrets/initialAdminPassword (secret key)
```

- Install Git

```bash
sudo yum install git

```

---

### Setup Apache Tomcat server

- Install apache tomcat

```bash
sudo yum update -y

sudo cd /opt

sudo wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.0.27/bin/apache-tomcat-10.0.27.tar.gz

sudo tar -xvzf apache-tomcat-10.0.27.tar.gz

sudo rm -r apache-tomcat-10.0.27.tar.gz

sudo mv apache-tomcat-10.0.27 tomcat
```

- Modify context.xml files

```bash
#search for context.xml
find / -name context.xml

#output of above command
/opt/tomcat/webapps/host-manager/META-INF/context.xml
/opt/tomcat/webapps/manager/META-INF/context.xml

#go into these files using vim editor and commant the tag "Value ClassName"
```

- Add user roles in tomcat-users.xml file which available in /opt/tomcat/conf/ folder

```xml
 <role rolename="manager-gui"/>
 <role rolename="manager-script"/>
 <role rolename="manager-jmx"/>
 <role rolename="manager-status"/>
 <user username="admin" password="admin" roles="manager-gui, manager-script, manager-jmx, manager-status"/>
 <user username="deployer" password="deployer" roles="manager-script"/>
 <user username="tomcat" password="s3cret" roles="manager-gui"/>
```

- Create shortcut links

```bash
ln -s /opt/tomcat/bin/startup.sh /usr/local/bin/tomcatup
ln -s /opt/tomcat/bin/shutdown.sh /usr/local/bin/tomcatdown
```

- Start Tomcat server

```bash
tomcatup
```

- Give admin rights to **ec2-user** against /opt folder inorder to deploy files

```bash
sudo chown -R ec2-user:ec2-user /opt
```

---

### Create Jenkins Pipeline and Jenkinsfile script

- Configure Git tool in jenkins global tool section
  ![Git Plugin](https://firebasestorage.googleapis.com/v0/b/my--drive-e7a5b.appspot.com/o/project_images%2Fjenkins_git_global_tool_config.png?alt=media&token=a23d902f-b95d-4877-917a-f297104b5c39)

- Setup jenkins SSH-Agent plugin and add your AWS key-pair values -![SSH-Agent Plugin](https://firebasestorage.googleapis.com/v0/b/my--drive-e7a5b.appspot.com/o/project_images%2Fjenkins_sshagent_setup_img.png?alt=media&token=9b2a8fd6-49d7-45c2-bcdc-5eedd79f97e5)

- Create **JenkinsFile**

```yml
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: 'main',
                    url:'https://github.com/phanison898/aws-ci-cd-pipe-line.git'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['tomcat-server']) {
                    sh "scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/sample-project/src/* ec2-user@34.205.69.92:/opt/tomcat/webapps/ROOT/"
                }
            }
        }
    }
}

```
