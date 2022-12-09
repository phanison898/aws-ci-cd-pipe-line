pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "The current build number is ${env.BUILD_NUMBER}"
                git branch: 'main',
                    url:'https://github.com/phanison898/aws-ci-cd-pipe-line.git'
            }
            post {
                success {
                    echo 'Successfully cloned the repository'
                }
                failure {
                    echo 'Failed to clone the repository'
                }
            }
        }

        stage('Deploy to server-1') {
            steps {
                sshagent(['aws-ec2-user']) {
                    sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/Multi-Server-Web-App/src/* ec2-user@44.204.31.39:/opt/tomcat/webapps/ROOT/'
                }
            }
        }

        stage('Deploy to server-2') {
            steps {
                sshagent(['aws-ec2-user']) {
                    sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/Multi-Server-Web-App/src/* ec2-user@54.86.169.56/:/opt/tomcat/webapps/ROOT/'
                }
            }
        }

        stage('Deploy to server-3') {
            steps {
                sshagent(['aws-ec2-user']) {
                    sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/Multi-Server-Web-App/src/* ec2-user@44.203.48.142/:/opt/tomcat/webapps/ROOT/'
                }
            }
        }
    }
}
