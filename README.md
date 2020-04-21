# ECE 428 Final Project - MyLiveStats using aed
By: Anthony Camilletti and Andrew Capone

![Overview](/media/realtime-refarch.png)
The project was based on the idea to allow anyone to be able to view the live stats of a baseball game if they can't be at the game. Someone who is at the game can interact with 3 buttons to add scores to each team as well as change the inning. We also though it was important to add a chat function to the app. Allowing for users to communicate with each other right from the app.

The project was built off of a project template from the [aws Appsync page](https://aws.amazon.com/appsync/), in section Use Cases->Real Time Colaboration->Databroadcasting.
For more information refer to the article [https://medium.com/open-graphql/aws-appsync-serverless-graphql-real-time-reference-architecture-19b16f5e9b93]. A link the the github page with the code can be found [here](https://github.com/aws-samples/appsync-refarch-realtime).

For more information refer to the article https://medium.com/open-graphql/aws-appsync-serverless-graphql-real-time-reference-architecture-19b16f5e9b93

### Quicklinks
- [Overview](#overview)
- [Initial Project Proposal](#initial-project-proposal)
- [Application](#application)
  - [Preview](#application-preview)
    - [Screenshots](#screenshots)
  - [Link](#link)
  - [Deploy Yourself](#deploy-yourself)
    - [Prerequisites](#prerequisites)
    - [One-Click Deploy with the Amplify Console](#one-click-deploy-with-the-amplify-console)
- [Current Issues](#current-issues)
- [Clean Up](#clean-up)

## Initial Project Proposal

//TODO: Add projet proposal here

## Application

### Preview

#### Screenshots
TODO: Add screenshots of application

### Link

Click the link below to take you to the web app. The application may not be running anymore due to pricing. See [Deploy Yourself](#deploy-yourself) for details on how to deploy it yourself.
TODO: Add link to the server.

### Deploy Yourself

#### Prerequisites

- [AWS Account](https://aws.amazon.com/mobile/details) with appropriate permissions to create the related resources

#### One-Click Deploy with the Amplify Console

Click the button to load the AWS Amplify Console, connect to GitHub and provide an IAM role for the build. The end to end back-end and front-end deployment should take around 10 minutes:

<p align="center">
    <a href="https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/AnthonyCamil/MyLiveStats.git" target="_blank">
        <img src="https://oneclick.amplifyapp.com/button.svg" alt="Deploy to Amplify Console">
    </a>
</p>

After the build is finished go to the [AWS AppSync Console](https://console.aws.amazon.com/appsync/home), access your newly deployed "realtime" GraphQL API and open the `Queries` section. Execute the following mutation to create the data structure that will collect and store votes in the Reviews table:

## Current Issues

We currently have some major issues that we are still overcoming. The major issue involves graphQL. We are currently having a hard time uploading to the DynamoDb. We are still working on solving this issue.
 
## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.
