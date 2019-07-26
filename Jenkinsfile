#!/usr/bin/env groovy

library identifier: 'apm@current',
retriever: modernSCM(
  [$class: 'GitSCMSource',
  credentialsId: 'f94e9298-83ae-417e-ba91-85c279771570',
  id: '37cf2c00-2cc7-482e-8c62-7bbffef475e2',
  remote: 'git@github.com:elastic/apm-pipeline-library.git'])

pipeline {
  agent {
    label 'linux && immutable'
  }

  environment {
    REPO = 'elasticsearch-js'
    BASE_DIR = "src/github.com/elastic/${env.REPO}"
  }

  options {
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20', daysToKeepStr: '30'))
    timestamps()
    ansiColor('xterm')
    disableResume()
    durabilityHint('PERFORMANCE_OPTIMIZED')
  }

  triggers {
    issueCommentTrigger('(?i).*(?:jenkins\\W+)?run\\W+(?:the\\W+)?tests(?:\\W+please)?.*')
  }

  stages {
    stage('Checkout') {
      agent { label 'master || immutable' }
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        gitCheckout(basedir: "${BASE_DIR}", githubNotifyFirstTimeContributor: false)
        stash allowEmpty: true, name: 'source', useDefaultExcludes: false
      }
    }

    stage('Install dependencies') {
      agent { label 'docker && immutable' }
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source'
        script {
          docker.image('node:10-alpine').inside(){
            dir("${BASE_DIR}"){
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
                stash allowEmpty: true, name: 'source-dependencies', useDefaultExcludes: false
              }
            }
          }
        }
      }
    }

    stage('License check') {
      agent { label 'docker && immutable' }
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source-dependencies'
        script {
          docker.image('node:10-alpine').inside(){
            dir("${BASE_DIR}"){
              withEnv([
                /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
                'npm_config_cache=npm-cache',
                /* set home to our current directory because other bower
                * nonsense breaks with HOME=/, e.g.:
                * EACCES: permission denied, mkdir '/.config'
                */
                'HOME=.',
                ]) {
                sh 'npm run license-checker'
              }
            }
          }
        }
      }
    }

    stage('Linter') {
      agent { label 'docker && immutable' }
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source-dependencies'
        script {
          docker.image('node:10-alpine').inside(){
            dir("${BASE_DIR}"){
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
    }

    stage('Unit test') {
      agent { label 'docker && immutable' }
      options { skipDefaultCheckout() }
      steps {
        deleteDir()
        unstash 'source-dependencies'
        script {
          docker.image('node:10-alpine').inside(){
            dir("${BASE_DIR}"){
              withEnv([
                /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
                'npm_config_cache=npm-cache',
                /* set home to our current directory because other bower
                * nonsense breaks with HOME=/, e.g.:
                * EACCES: permission denied, mkdir '/.config'
                */
                'HOME=.',
                ]) {
                sh 'npm run test:unit'
                sh 'npm run test:behavior'
                sh 'npm run test:types'
              }
            }
          }
        }
      }
    }

    stage('OSS integration test') {
      agent { label 'docker && immutable' }
      options { skipDefaultCheckout() }
      steps {
        echo 'OSS integration test'
      }
    }

    stage('xPack integration test') {
      agent { label 'docker && immutable' }
      options { skipDefaultCheckout() }
      steps {
        echo 'xPack integration test'
      }
    }
  }
}
