def status = true

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: 'main',
                    url:'https://github.com/phanison898/aws-ci-cd-pipe-line.git'
            }
            post {
                success {
                    echo 'Successfully cloned the repository'
                    status = false
                }
                failure {
                    status = false
                    echo 'Failed to clone the repository'
                }
            }
        }
        
        stage('Deploy to Tomcat') {
            if(status){
                steps {
                    sshagent(['tomcat-server']) {
                        sh "scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/sample-project/src/* ec2-user@34.205.69.92:/opt/tomcat/webapps/ROOT/"
                    }
                }
                post {
                    success {
                        echo 'Successfully deployed the website in Tomcat server'
                    }
                    failure {
                        echo 'Failed to deploy the website in Tomcat server'
                    }
                }
            }
        }
        
        stage('Deploy to Nginx') {
            steps {
                sshagent(['tomcat-server']) {
                    sh "scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/sample-project/src/* ec2-user@34.205.69.92:/usr/share/nginx/html/"
                }
            }
             post {
                success {
                    echo 'Successfully deployed the website in Nginx server'
                }
                failure {
                    echo 'Failed to deploy the website in Nginx server'
                }
            }
        }
    }
}
