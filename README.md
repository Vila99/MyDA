
### Explicación Notas

PROBLMEAS
 - Si la nota es muy larga se solapa con el footer y traspasa la pagina.

1. **`NotesPage.js`**:
   - Maneja el estado y la lógica de `localStorage`.
   - Usa `useEffect` para cargar y guardar notas en `localStorage`.
   - Pasa `notes` y funciones para manejar notas a `NoteList` como props.

2. **`NoteList.js`**:
   - Muestra la lista de notas y el formulario en la misma página.
   - Permite crear una nueva nota, editar una nota existente o visualizar una nota seleccionada en el formulario.
   - Maneja el estado del formulario localmente dentro de `NoteList`.

Este enfoque mantiene el código organizado y asegura que la lógica de manejo de notas esté en el componente adecuado. Además, asegura que el estado y las notas se mantengan sincronizados con `localStorage`.
