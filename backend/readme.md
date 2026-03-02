Core Business: Prodotto appartiene a una Categoria.

Risorse Umane: Dipendente lavora in un Reparto e può essere assegnato a più Progetto (Many-to-Many).

Contenuti: Pagina contiene più Articolo.com.progetto.gestionale
 ├── controller    (Espone le API)
 ├── service       (Logica di business e calcoli)
 ├── repository    (Interfacce JPA per il DB)
 ├── entity        (Classi @Entity - Tabelle DB)
 ├── dto           (Oggetti per il Frontend)
 ├── response      (La tua classe ApiResponse)
 └── config        (Configurazione CORS e sicurezza)