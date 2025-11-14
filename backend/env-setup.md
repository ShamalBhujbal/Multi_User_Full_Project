# Environment Setup

Create a `.env` file in the `backend` directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-taking-app
JWT_SECRET=your-super-secret-jwt-key-change-this-to-a-random-string-in-production
```

## For Windows PowerShell:
```powershell
@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-taking-app
JWT_SECRET=your-super-secret-jwt-key-change-this-to-a-random-string-in-production
"@ | Out-File -FilePath .env -Encoding utf8
```

## For Linux/Mac:
```bash
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-taking-app
JWT_SECRET=your-super-secret-jwt-key-change-this-to-a-random-string-in-production
EOF
```

## MongoDB Atlas (Cloud Option):
If using MongoDB Atlas, replace MONGODB_URI with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/note-taking-app
```

