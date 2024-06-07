# Como colocar em produção no ambiente DEV (cardif-dev.qelplatam.com)

## 1. Codar o react localmente na máquina
```
npx create-react-app nome-do-app
npm start watch
```

## 2. Subir as alterações pro BitBucket/GitLab/GitHub
```
git add .
git commit -m "mensagem"
git push -u origin main
```

## 3. Logar no AWS
```
ec2-user
```

## 4. Clonar o repositório do BitBucket/GitLab/GitHub
```
cd /var/www/html/

sudo mkdir /var/www/html/repos

cd repos

sudo git clone https://github.com/wholetomy/cardif-chat-landing-page.git

cd cardif-chat-landing-page

sudo npm i

sudo npm run build

cp -r /var/www/html/repos/cardif-chat-landing-page/build/* /var/www/html/cardif-dev/

sudo systemctl restart httpd
```

