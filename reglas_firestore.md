# Para no permitir que usuarios sin loguarse accedan a la colección cuestionarios

En cloud firestore, cambiar las reglas por la siguiente:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cuestionarios/{cuestionario} {
      allow read;                   // permito leer a todo el mundo
      allow write: if               // permito guardar a los usuarios logueados
          request.auth.uid != null;
    }
    match /respuestas/{respuesta} {
      allow read, write;            // permito leer y guardar las respuesas a todo el mundo
    }
  }
}
```