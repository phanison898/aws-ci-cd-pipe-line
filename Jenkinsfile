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
                    sh "scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/sample-project/src/* ec2-user@34.205.69.92:/opt/tomcat/webapps/myapp/"
                }
            }
        }
    }
}
