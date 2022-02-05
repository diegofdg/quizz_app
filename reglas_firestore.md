# Para no permitir que usuarios sin loguarse accedan a la colección cuestionarios

En cloud firestore, cambiar las reglas por la siguiente:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cuestionarios/{cuestionario} {
      allow read, write: if
          request.auth.uid != null;
    }
  }
}
```