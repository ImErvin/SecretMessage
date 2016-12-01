# SecretMessage
1. #### Webapp Description
  SecretMessage was developed as a project for a Third Year Software Development Module, **Data Representation and Querying**.

  SecretMessage's aim is to provide a service for creating confidential messages that are encrypted and decrypted on the client side. 
  It allows users to generate a URL for a message that they have created. This URL will then be used to access and decrypt 
  the message.
  
  When creating SecretMessage, I aimed to provide a very minimalistic and easy to use user interface and for SecretMessage to do exactly what is says on the tin.

2. #### Webapp Developers
  | Name          | GitHub Username | Student ID  |
  | ------------- |:-------------:| -----:|
  | Ervin      | ImErvin | G0031115 |

3. #### Project Overview
  I have created a Single-Page Web Application (SPA) that allows the users to send confidential messages. This application was selected
  because I was very interested in how websites use URL generation to display data. This resulted in further consideration
  into existing web apps that implement this feature. The following apps were considered:
    * A [Pastebin](http://pastebin.com/) replica
    * A [Collabedit](http://collabedit.com/) replica
    * A [Privnote](http://privnote.com/) replica
    
  I ruled out Collabedit because it will be very tough to get working as it will allow multiple users to access one file. After that
  ruling, I was left with Pastebin and Privnote. I was torn between Pastebin and Privnote but after better inspection I saw that
  Privnote not only generated a link but also generated a decryption key too. This really sparked an interest.
  
4. #### Planning Phase
  1. Outlining Tasks:<br />
      Once I chose Privnote as my project base I began to reverse engineer it. The following tasks were clearly outlined:
        * Allow the user to enter a message into a text area.
        * Generate a URL for the message.
        * Allow the user to open a message using a URL.
        * Delete a message once it has been seen.
        * Encrypt and Decrypt the message.
  
  2. Outlining Technologies:<br />
      After considering the tasks above I had to consider the technologies I would have to implement to complete the tasks outlined. I came up with the following technologies:
        * [Python](https://www.python.org/)
        * [Flask Back End Framework](http://flask.pocoo.org/)
        * [Bootstrap Front End Library](http://getbootstrap.com/)
        * [AngularJS Javascript Library](https://angularjs.org)
        * [CouchDB Database](http://couchdb.apache.org/)
      
      **Python**<br/>
      Python was selected as we needed to use Python to develop our SPA.
      Referring to the project requirements:<br/>
      >You are required to develop a single-page web application(SPA) written
        in the programming language Python using the Flask framework.
        You must devise an idea for a web application, write the software, write
        documentation explaining how the application works, and write a short user
        guide for it.
      
      *Advantage*: Python allows your to run your server locally and it implements Flask.<br />
      *Disadvantage*: I had to learn Python which added to development time.
       
      **Flask**<br/>
      Flask was selected as we have been using Flask in our lectures and labs in college.
      Flask is a pretty obvious choice as it's a framework for Python that aims to make
      development of web applications a lot developer friendly. The fact that we thoroughly
      used Flask during our labs, I had substantial knowledge base on how Flask works.<br />
      *Advantage*: Flask implements great libaries for developing a web app.<br />
      *Disadvantage*: I had to learn how to use Flask and the libraries it provides.
      
      **Bootstrap**<br/>
      Twitters Bootstrap was selected as it provides an abundant amount of CSS and useful Javascript widgets
      to make your webpage look good. It was an obvious choice as it is implemented by a lot of websites,
      and is top tier when it comes to a front end library that's easy to use.<br />
      *Advantage*: Abundant front end components reduces development time by providing pretty code necessary for a pretty website.<br />
      *Disadvantage*: Bootstrap is a heavy library and includes components you may not use thus bulking up your directory.
      
      **AngularJS**<br />
      AngularJS was selected because I really admired the data binding side of AngularJS. AngularJS is very
      employable for front-end development positions and so I decided to try to implement AngularJS and further
      learn how to use it. I also had a substantial knowledge base on how AngularJS works from my Mobile-App
      Development module in Second Year.<br />
      *Advantage*: AngularJS allows easy data binding and can handle all the routing. It also updates asynchronously adding 
      to the SPA side of things.<br />
      *Disadvantage*: AngularJS isn't straightforward and it conflicts with jinja2's databinding.
      
      **CouchDB**<br />
      CouchDB was selected as the database to use. MongoDB and CouchDB were head to head when it came to
      database technology planning as I wanted to use a nonsql database. After struggling to choose between the
      two I decided to go with CouchDB as it was much easier to implement and I had already learned how to query it and
      set it up in one of the Labs which in return saved me some development time.<br />
      *Advantage*: CouchDB is very easy to set up and use.<br />
      *Disadvantage*: Data is bulky as it's in JSON format.
      
  3. Outlining Relevant HTTP Methods:<br/>
      By referencing relevant course material and using knowledge I gained from doing the labs, I came to the
      conclusion to use the following methods:
        * **GET**
        * **POST**
      
      **GET:**
       GET will allow my Python API to return JSON objects to be processed by my AngularJS.<br/>
      **POST:**
       POST will allow my AngularJS to send JSON to my python API and allow python to process the data.

5. #### Architecture
    The web app uses the technologies above to provide an stable architecture. Python 3 is used with Flask to run the back end of the application
    and provide routes that the front end will query. The front end consists of Bootstrap and AngularJS libraries with miniature implementation
    of fontawesome for the footer.
    
    The Python Architecture is designed to synergies each route. Each route will directly reference another in one way or another. Further
    details in comment block in my webapp.py file.
    
    The AngularJS Architecture is designed by allowing the factory to make all the AJAX calls in functions and return those functions to the controllers.
    The controllers then act as a bridge between the functions in the factory and the HTML to allow the user to use them.
    
    The Directory Architecture is designed to correspond to Flasks static methods and template methods.<br/><br/>
    The Static directory will hold static files such as CSS,Javascript files,Image files separated into relevant directories. It also holds the index.htm 
    and about.html as they are retrieved from flask which
    looks for them in the static folder.<br/><br/>
    The Template directory will hold template HTML files that will display unique data (sent from Jinja2) everytime they're queried. Holds messageTemplate.html and messageErrorTemplate.html

6. #### How to run the application
    Since bower files and libraries are included in the project, we do not need to install it and initiate it to install libaries.
    
    Install [CouchDB](http://couchdb.apache.org/)<br />
    Install [Python3](https://www.python.org/download/releases/3.0/)
    
    Once you have installed the prerequisites above open any Bash command prompt to run the following commands.
    Install required plugins for Python.
    ```bash
    $ pip install -r requirements.txt
    ```
    
    Clone this repository to a desired directory.
    ```bash
    $ CD Desktop
    
    $ git clone https://github.com/ImErvin/SecretMessage 
    ```
    Change your directory to SecretMessage.
    ```bash
    $ CD SecretMessage
    ```
    Set up the database by running setup.py
    ```bash
    $ python setup.py
    ```
    Start up your app locally by running webapp.py
    ```bash
    $ python webapp.py
    ```
7. #### Conclusion:
    By doing this project I achieved my personal goal of learning about all the new technologies I implemented into my web app. It has been a great learning experience and was very acomplishing to create a fully working website that I can display on my Github Profile.
    
    The main differences I'd make to the project if I were to start again are:
     * To make a better use of AngularJS and to use Angular to handle the routings and handle the front end completely as a seperate app.
     * Get a better understanding of RESTful APIs and implement my Python to act as the RESTful API and server host.
     * I would make better use of AngularJS's $http requests thus making jQuery redundant.
     * Make a more efficient implementation for dynamically updating content on a single HTML page.
    
    The secondary differences I'd make to the project if I were to start again are:
      * Make bower redundant by using CDN links to libaries.
      * Decrease the amount of GET requests made when a new page is loaded by implementing the point above.
    

