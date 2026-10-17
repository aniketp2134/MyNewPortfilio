pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Stage 1: Retrieving website source code'
                checkout scm
            }
        }

        stage('Validate Website') {
            steps {
                echo 'Stage 2: Checking website files'

                bat '''
                    if not exist index.html exit /b 1
                    if not exist style.css exit /b 1
                    if not exist script.js exit /b 1
                    if not exist Resume.pdf exit /b 1
                    if not exist README.MD exit /b 1
                    findstr /C:"Java Full Stack Developer" index.html
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Stage 3: Deploying website to EC2'

                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    bat '''
                        @echo off

                        echo Restricting temporary SSH key permissions...

                        icacls "%SSH_KEY%" /inheritance:r
                        if errorlevel 1 exit /b 1

                        icacls "%SSH_KEY%" /remove:g "*S-1-5-32-545"
                        if errorlevel 1 exit /b 1

                        icacls "%SSH_KEY%" /grant:r "*S-1-5-18:(R)"
                        if errorlevel 1 exit /b 1

                        echo Preparing deployment directory on EC2...

                        ssh -i "%SSH_KEY%" -o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new %SSH_USER%@15.207.14.181 "mkdir -p /tmp/devops-cicd"
                        if errorlevel 1 exit /b 1

                        echo Copying website files to EC2...

                        scp -i "%SSH_KEY%" -o BatchMode=yes -o StrictHostKeyChecking=accept-new index.html style.css %SSH_USER%@15.207.14.181:/tmp/devops-cicd/
                        if errorlevel 1 exit /b 1

                        echo Installing website files for Nginx...

                        ssh -i "%SSH_KEY%" -o BatchMode=yes -o StrictHostKeyChecking=accept-new %SSH_USER%@15.207.14.181 "sudo install -m 644 /tmp/devops-cicd/index.html /tmp/devops-cicd/style.css /var/www/html/ && sudo nginx -t && sudo systemctl reload nginx"
                        if errorlevel 1 exit /b 1

                        echo Deployment commands completed successfully.
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Stage 4: Checking website response'

                bat '''
                    curl.exe --fail --silent --show-error http://15.207.14.181/ -o NUL
                    if errorlevel 1 exit /b 1
                    echo Website responded successfully.
                '''
            }
        }
    }
}
