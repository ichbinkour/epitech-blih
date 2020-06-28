const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Blih = require("blih");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

app.get('/login', (req, res) => {
  const api = new Blih({
    email: req.query.email,
    password: req.query.password,
  });

  api.whoami().then(response => {
    return res.status(200).json({
      email: response
    })
  }).catch(e => {
    return res.status(400).json(e)
  })
})

app.get("/repositories", (req, res) => {
  const api = new Blih({
    email: req.query.email,
    password: req.query.password,
  });

  api
    .listRepositories()
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((e) => {
      return res.status(400).json(e)
    });
});

app.get('/repository', (req, res) => {
  const api = new Blih({
    email: req.query.email,
    password: req.query.password,
  });

  api.repositoryInfo(req.query.repoName).then(response => {
    return res.status(200).json(response)
  }).catch(e => {
    return res.status(400).json({
      error: e
    })
  })
})

app.get('/repository/acls', (req, res) => {
  const api = new Blih({
    email: req.query.email,
    password: req.query.password
  })

  api.getACL(req.query.repoName).then(response => {
    return res.status(200).json(response)
  }).catch(e => {
    return res.status(400).json(e)
  })
})

app.post('/repository/acl', (req, res) => {
  const api = new Blih({
    email: req.body.email,
    password: req.body.password
  })

  api.setACL(req.body.repoName, req.body.acl.name, req.body.acl.acls).then(response => {
    return res.status(200).json(response)
  }).catch(e => {
    return res.status(400).json(e)
  })
})

app.post('/repository/delete', (req, res) => {
  const api = new Blih({
    email: req.body.email,
    password: req.body.password
  })

  api.deleteRepository(req.body.repoName).then((response) => {
    return res.status(200).json({
      response
    })
  }).catch((e) => {
    return res.status(400).json(e)
  })
})

app.post('/repository', (req, res) => {
  const api = new Blih({
    email: req.body.email,
    password: req.body.password
  })

  api.createRepository(req.body.repoName).then(response => {
    return res.status(200).json(response)
  }).catch(e => {
    return res.status(400).json({
      error: e
    })
  })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
