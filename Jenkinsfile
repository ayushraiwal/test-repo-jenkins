pipeline {
    agent any

    stages {
        stage('Docker Build') {
            steps {
                sh 'docker build -t gymlogy-new-image1:latest .' // Replace with your git clone command
            }
        }
        stage('Stop docker container') {
            steps {
                sh 'docker stop $(docker ps -aq --filter name=node-app-con)' // Replace with your image name
            }
        }
        stage('Remove docker container') {
            steps {
                sh 'docker rm $(docker ps -aq --filter name=node-app)'
            }
        }
         stage('Run docker container') {
            steps {
                sh 'docker run -d --name node-app -p 40005:40005 gymlogy-new-image:latest'
            }
        }
    }
}