# Docker Assignment 1 - Readme

This readme file provides a step-by-step guide on how to set up and use the Docker file for Assignment 1. Please follow the instructions below:

1. Clone the repository to your local machine:
    ```
    git clone https://github.com/your-username/repo-name.git
    ```

2. Navigate to the project directory:
    ```
    cd repo-name
    ```

3. Open the Dockerfile in a text editor and review its contents. Make any necessary modifications based on your requirements.

4. Build the Docker image:
    ```
    docker build -t image-name .
    ```

5. Run the Docker container:
    ```
    docker run -d -p 8080:80 image-name
    ```

6. Access the application in your web browser:
    ```
    http://localhost:8080
    ```

7. Test the functionality of the application and ensure it is working as expected.

8. If you encounter any issues or errors, refer to the troubleshooting section in the Docker documentation or seek assistance from the community.

9. Once you have finished testing, stop and remove the Docker container:
    ```
    docker stop container-id
    docker rm container-id
    ```

10. Congratulations! You have successfully set up and used the Docker file for Assignment 1.
