# ai-tech-support
# setup the dev environment

cd backend
venv\Scripts\activate
'python manage.py runserver' to start backend

'npm run dev' to start frontend

# TO-DO list
Yoda-bot or, Cloda as I'm calling him, doesn't currently do document attachments, should it?

Maybe switch off 'respond in Yoda-speak' ... but not yet

add sidebar ... why?
    to put links in to other pages/apps

add a profile component, figure out how to manage media files dev vs prod... this is what copilot said:

"In this code, static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) creates a URL pattern for serving media files during development.

Now, your server should be able to serve media files, and the image should display correctly. Please note that this is not suitable for production use. In a production environment, you should configure your web server to serve media files."


