# DevTinder

- Create a Vite + React Application
- Remove unecessary code and create a Hello World App.
- Install tailwind css
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer
- Create A Login Page
- Install Axios
- CORS -- install cors in backend ==> add middleware to app with configuration : origin, credentials=true
- Whenever making api call so pass {withCredential : true} in axios
- Install Redux Toolkit - documentation
- Install react-redux + redux toolkit both
- configureStore = > Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as user logs in
- Refractor our code to add constants file + create a component folder
- You should not ne able to access routes without login
- If token is not present, redirect user to login page
- Logout
- Profile
- get the feed and add the feed in the store
- Build the used card on feed
- Edit Profile BUild
- Toast msg on save
- See all my connections
- New page - to see all my Connection Requests.
- Feature - Accept/Reject Connection Request

Remaining :

- Send/Ignore the user card from Feed
- Signup New User
- E2Etesting

BODY
NAVBAR
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile

# Deployment :

AWS :

    - Cloud Server
    - Create AWS account
    - Go to console home
    - Search EC2
        - EC2 - Virtual Servers in AWS(Elastic compute)
        - Launch Instancre
        - chmod 400 <secret>.pem
        - Connect  command -> ssh -i "nodeDevTinder-secret.pem" ubuntu@ec2-15-207-21-125.ap-south-1.compute.amazonaws.com
        - Install node version as same as in your system projects.
        - Now git Clone your projects into it.

        - Frontend :
            - Install dependencies using npm install
            - npm run build
            - Now we will need to install nginx to host our frontend project
            - sudo apt update
            - sudo apt install nginx
            - sudo systemctl start nginx -- (To start nginx)
            - sudo systemctl enable nginx --- (To enable the nginx)
            - Copy code from dist(build files) to /var/www/html/
               -Command  -- sudo scp -r dist/* /var/www/html
            - Enable port :80 on your instance

        - Backend :
            - Allow EC2 Instance public IP on mongodb server
            - Install PM2 ( npm install pm2 -g) --> -g for installing globally.
            - pm2 start npm -- start (For starting server)
            - pm2 logs -- (for checking any logs error anything)
            - pm2 flush npm -- (clear or flush the logs)
            - pm2 list , pm2 flush <name> , pm2 stop <name>, pm2 delete <npm>
            - pm2 start npm --name "<name_for_process>" -- start
            - config nginx - /etc/nginx/sites-available/default
            - restart nginx -- ( sudo systemctl restart nginx )
            - Modify the BASEURL in frontend project to "/api"


        Frontend = http://3.110.171.212/
        Backend = http://3.110.171.212:7777/

        Domain name = devtinder.com => http://3.110.171.212/

        After mapping :
            Frontend = devtinder.com
            Backend = devtinder.com:7777 => devtinder.com/api

        For this we will use nginx proxy config
            - In /etc/nginx/sites-available/default
                - server_name <DOMAIN_NAME OR IP ADDRESS>;

                # Forward only /api requests to Node.js app
                location /api/ {
                    proxy_pass http://localhost:7777/;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
                }


# Adding a custom Domain Name :

    - Purchase domain name from godaddy
    - signup on cloudfare add a new domain name
    - change the nameservers on godaddy and point it to cloudfare
    - wait for some time till your nameservers are updated.
    - DNS record -- A record -- <domain name> -- <Your IP Address> - On Cloudfare
    - Enable SSL for website -- On Cloudfare


# Sending Emails via SES

    - Create a IAM user
    - Give Access to AmazonSESFullAccess
    - Amazon SES : Craete an Identity in SES
    - Verify your Domain Name 
    - Verify an email Address
    - Install AWS SDK - v3
    - Code example -https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js#L16

    - Setup SesClient
    - Access Credentials should be created in IAM under SecurityCrediamtials Tab
    - Add the credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function.


# Scheduling cron jobs in NodeJS

    - Installing node-cron
    - Learning about cron expression syntax ---crontab.guru
    - Schedule a JOb
    - date-fns
    - Find all the unique email ID who have got connection Request in previous day
    - Send Email
    - Explore queue mechanism to send bulk emails
    - Amazon SES Bulk Emails
    - Make sendEmail function dynamic or template based.
    - bee-queue & bull npm packages.
