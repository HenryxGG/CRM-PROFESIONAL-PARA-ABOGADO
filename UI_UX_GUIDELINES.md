# UI/UX GUIDELINES - CRM LEGAL

## 1. Filosofía de Diseño
*   **Sobriedad y Confianza:** El diseño debe transmitir profesionalismo. Evitar colores neón o estilos "juguetones".
*   **Claridad:** La información legal es densa. El uso de espacio en blanco (whitespace) es vital.
*   **Eficiencia:** El abogado cobra por tiempo. Reducir clics para acciones comunes (ej. guardar un evento, subir un escrito).

## 2. Paleta de Colores

| Color | Hex | Uso |
| :--- | :--- | :--- |
| **Navy Blue** | `#0f172a` | Barras de navegación, textos principales, botones primarios. |
| **Slate Gray** | `#64748b` | Textos secundarios, iconos inactivos. |
| **Gold / Ocre** | `#d97706` | Acentos, botones de llamada a la acción (CTA) secundarios, estados de "Pendiente". |
| **White** | `#ffffff` | Fondos de tarjetas y contenedores. |
| **Background** | `#f1f5f9` | Fondo general de la aplicación (Gris muy pálido). |
| **Error** | `#ef4444` | Alertas críticas, fechas vencidas. |
| **Success** | `#10b981` | Tareas completadas, pagos recibidos. |

## 3. Tipografía
*   **Familia:** `Inter` (Google Fonts).
*   **Pesos:**
    *   Regular (400): Cuerpo de texto.
    *   Medium (500): Etiquetas, menús, botones.
    *   SemiBold (600): Títulos de tarjetas.
    *   Bold (700): Encabezados principales (H1, H2).

## 4. Componentes Clave (Wireframes Conceptuales)

### A. Layout Principal (App Shell)
*   **Sidebar Izquierdo:**
    *   Logo del Estudio.
    *   Menú de Módulos (Dashboard, Clientes, Casos, Agenda, Documentos, Finanzas).
    *   Usuario / Configuración al pie.
*   **Top Bar:**
    *   Buscador Global ("Buscar cliente, caso o escrito...").
    *   Notificaciones (Campana).
    *   Botón de Acción Rápida (`+`).

### B. Tarjeta de Caso (Card en Grid/Lista)
*   Debe mostrar:
    *   Código / Número de Proceso.
    *   Cliente (Avatar + Nombre).
    *   Estado (Badge de color).
    *   Última actividad (Fecha).
    *   Barra de progreso (visual) de etapa procesal.

### C. Vista de Detalle de Caso
*   **Cabecera:** Resumen del caso, Estado actual, Responsable.
*   **Pestañas (Tabs):**
    1.  **Bitácora:** Timeline vertical.
    2.  **Documentos:** Explorador de archivos (Grid/List).
    3.  **Tareas/Eventos:** Listado con checkboxes.
    4.  **Finanzas:** Tabla de honorarios y gastos.

## 5. Responsividad
*   **Móvil:**
    *   Sidebar se convierte en menú hamburguesa.
    *   Tablas complejas se convierten en tarjetas (Cards).
    *   Botones de acción (FAB) flotantes para "Nuevo Evento" o "Subir Foto".

---
**Nota:** Se recomienda usar `Tailwind CSS` y componentes de `Shadcn/UI` para implementar estos lineamientos rápidamente.
