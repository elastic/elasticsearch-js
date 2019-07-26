pipeline {
  agent { 
    label 'linux && immutable'
  }

  stages {
    stage('Install dependencies') {
      steps {
        script {
          docker.image('node:10-alpine').inside(){
            withEnv([
              /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
              'npm_config_cache=npm-cache',
              /* set home to our current directory because other bower
              * nonsense breaks with HOME=/, e.g.:
              * EACCES: permission denied, mkdir '/.config'
              */
              'HOME=.',
              ]) {
              sh '''node --version
                    npm --version'''
              sh 'npm install'
            }
          }
        }
      }
    }

    stage('License check') {
      steps {
        script {
          docker.image('node:10-alpine').inside(){
            sh 'npm run license-checker'
          }
        }
      }
    }

    stage('Linter') {
      steps {
        script {
          docker.image('node:10-alpine').inside(){
            withEnv([
              /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
              'npm_config_cache=npm-cache',
              /* set home to our current directory because other bower
              * nonsense breaks with HOME=/, e.g.:
              * EACCES: permission denied, mkdir '/.config'
              */
              'HOME=.',
              ]) {
              sh 'npm run lint'
            }
          }
        }
      }
    }

    stage('Unit test') {
      steps {
        echo 'Unit test'
      }
    }

    stage('OSS integration test') {
      steps {
        echo 'OSS integration test'
      }
    }

    stage('xPack integration test') {
      steps {
        echo 'xPack integration test'
      }
    }
  }
}
