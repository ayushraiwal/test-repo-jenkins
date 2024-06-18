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
                sh 'docker build -t chucknorris' // Replace with your image name
            }
        }
         stage('Stop Docker Container') {
            steps {
                script {
                    def container_id = sh(script: "docker ps -aq --filter name=chucknorris", returnStdout: true).trim()
                 if (container_id) {
                        sh "docker stop ${container_id}"
                    } else {
                        echo "No container found to stop."
                    }
                }
            }
        }
        stage('Remove Docker Container') {
            steps {
                script {
                    def container_id = sh(script: "docker ps -aq --filter name=chucknorris", returnStdout: true).trim()
                  if (container_id) {
                        sh "docker rm ${container_id}"
                    } else {
                        echo "No container found to remove."
                    }
                }
            }
        }
        stage('Run Node.js Application') {
            steps {
                sh 'docker run -d --name node-app -p 40005:40005 chucknorris:latest'
            }
        }
    }
}
