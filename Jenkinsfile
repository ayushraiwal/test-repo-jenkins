pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                sh 'git clone https://github.com/betterstack-community/chucknorris' // Replace with your git clone command
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build . -t chucknorris' // Replace with your image name
            }
        }
        stage('Stop Docker Container') {
            steps {
                sh 'docker stop $(docker ps -aq --filter "name=chucknorris")' // Replace with your container name
            }
        }
        stage('Remove Docker Container') {
            steps {
                sh 'docker rm $(docker ps -aq --filter "name=chucknorris")' // Replace with your container name
            }
        }
        stage('Run Node.js Application') {
            steps {
                sh 'docker run -d --name node-app -p 40005:40005 chucknorris:latest'
            }
        }
    }
}
