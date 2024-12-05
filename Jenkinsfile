pipeline {
    agent any

    environment {
        // Define environment variables here
        GIT_REPO_URL = 'https://github.com/Kneoautomationorg/UI_Host.git'
        GIT_BRANCH = 'UI_Dev'
        SONARQUBE_SCANNER = 'SonarQubeScanner'
        PRODUCTION_FOLDER = 'C:\\Docker\\Development_Environment\\PlatformUI\\dump'
        DOCKER_COMPOSE_PATH = 'C:\\Docker\\Development_Environment'
        DOCKER_SERVICE = 'platform-balloon-host-server'

        DOCKER_IMAGE_NAME = 'development_environment-platform-balloon-host-server'
        DOCKER_HUB_REPO = 'kneoautomation/development_environment-platform-balloon-host-server'
        IMAGE_TAG = 'latest'
        DOCKER_CREDENTIALS_ID = 'DockerHub' // Your Docker Hub credentials ID
    }

    stages {
        stage('Pull Code from Git') {
            steps {
                // Pull code from your Git repository
                git url: "${env.GIT_REPO_URL}", branch: "${env.GIT_BRANCH}"
            }
        }
        
        stage('Send to SonarQube') {
            steps {
                script {
                    node {
                        stage('SCM') {
                            checkout scm
                        }
                        stage('SonarQube Analysis') {
                            def scannerHome = tool "${env.SONARQUBE_SCANNER}";
                            withSonarQubeEnv() {
                                bat "${scannerHome}/bin/sonar-scanner"
                            }
                        }
                    }
                }
            }
        }
        
        // stage('Check SonarQube Quality Gate') {
        //     steps {
        //         script {
        //             // Wait for SonarQube quality gate result
        //             def qualityGate = waitForQualityGate()
        //             if (qualityGate.status != 'OK') {
        //                 error "Quality Gate failed: ${qualityGate.status}"
        //             }
        //         }
        //     }
        // }
           
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                bat 'npm install'
            }
        }
        
        stage('Build Production') {
            steps {
                // Build the React application
                bat 'npm run build'
            }
        }
        
        stage('Prepare Production Folder') {
            steps {
                script {
                    // Cleanup the production folder
                    bat """
                        if exist "${env.PRODUCTION_FOLDER}" (
                            echo Deleting old files...
                            del /Q /S "${env.PRODUCTION_FOLDER}\\*"
                            rmdir /S /Q "${env.PRODUCTION_FOLDER}"
                        )
                        echo Creating new production folder...
                        mkdir "${env.PRODUCTION_FOLDER}"
                    """
                }
            }
        }
        
        stage('Move Build to Production Folder') {
            steps {
                // Copy all contents from dist to the target folder
                bat "xcopy /E /I /Y \"dist\\*\" \"${env.PRODUCTION_FOLDER}\\\""
                // Optionally remove the now-empty 'dist' directory
                bat 'rmdir /S /Q dist'
            }
        }

        stage('Build and Deploy Docker Image') {
            steps {
                // Change directory to where the docker-compose.yml file is located
                dir("${env.DOCKER_COMPOSE_PATH}") {
                    // Build and run the Docker container in detached mode
                    bat "docker-compose up -d --build ${env.DOCKER_SERVICE}"
                }
            }
        }
        
        stage('Tag and Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub using username and password stored as Jenkins credentials
                    withCredentials([usernamePassword(credentialsId: 'DockerToken', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        // Perform Docker login using the password directly in the command
                        bat "docker login -u %USERNAME% -p %PASSWORD%"

                        // Tag the Docker image with a new tag
                        def newTag = "latest" // Or use a different tag strategy if needed
                        bat "docker tag ${env.DOCKER_IMAGE_NAME} ${env.DOCKER_HUB_REPO}:${env.IMAGE_TAG}"

                        // Push the Docker image to Docker Hub
                        bat "docker push ${env.DOCKER_HUB_REPO}:${newTag}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean the workspace regardless of the build outcome
            deleteDir()
        }
        failure {
            // Actions to take in case of failure
            echo 'Build failed!'
        }
        success {
            // Actions to take in case of success
            echo 'Build succeeded!'
        }
    }
}
