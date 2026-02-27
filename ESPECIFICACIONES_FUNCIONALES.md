# ESPECIFICACIONES FUNCIONALES: CRM JURÍDICO ECUADOR

**Versión:** 1.0  
**Fecha:** 2026-02-09  
**Autor:** Arquitecto de Software Legal Senior (AI)

---

## 1. CONTEXTO GENERAL

El presente documento define las especificaciones funcionales para el desarrollo de un CRM (Customer Relationship Management) Web especializado para el sector legal en Ecuador. El sistema está diseñado para abogados independientes y estudios jurídicos, adaptándose específicamente a la normativa de la **Función Judicial del Ecuador** y a la práctica procesal local.

### Características Principales
*   **Plataforma:** 100% Web (SaaS).
*   **Accesibilidad:** Diseño Responsivo (Desktop, Tablet, Móvil).
*   **Enfoque:** Gestión integral de clientes, procesos (SATJE/e-SATJE), plazos legales, facturación y documentación.
*   **Seguridad:** Estándares altos de confidencialidad abogado-cliente.

---

## 2. OBJETIVO DEL SISTEMA

Centralizar el flujo de trabajo jurídico, permitiendo el control total sobre expedientes físicos y digitales, automatizando el seguimiento de plazos fatales y gestionando la rentabilidad del despacho mediante el control de honorarios y gastos.

---

## 3. PERFILES DE USUARIO Y SEGURIDAD

El sistema implementará un modelo de control de acceso basado en roles (RBAC) estricto.

| Rol | Descripción | Nivel de Acceso |
| :--- | :--- | :--- |
| **Administrador** | Socio principal o gerente del estudio. | Acceso total a configuración, facturación global, todos los casos y auditoría. |
| **Abogado Patrocinador** | Abogado senior a cargo de casos. | Acceso total a sus casos asignados, edición de escritos, gestión de hitos y visualización de facturación de sus casos. |
| **Abogado Asociado** | Abogado junior o de apoyo. | Acceso de lectura/escritura limitado a casos asignados. Sin acceso a facturación global. |
| **Asistente Legal** | Paralegal o secretario/a. | Carga de documentos, actualización de agenda, revisión de casilleros judiciales. Sin permisos de eliminación crítica. |
| **Administrativo/Contable** | Personal de finanzas. | Acceso exclusivo a módulos de facturación, cobros, gastos y reportes financieros. Restringido al detalle sensible del expediente. |

---

## 4. ESTRUCTURA Y MÓDULOS DEL SISTEMA

### 4.1. MÓDULO: DASHBOARD (PANEL DE CONTROL)
La vista principal debe responder *"¿Qué requiere mi atención inmediata?"*.
*   **Alertas Críticas:** Plazos que vencen en 24/48 horas (Semáforo: Rojo).
*   **Agenda del Día:** Audiencias y reuniones programadas para hoy.
*   **Resumen de Carga:** Gráfico de procesos activos por estado.
*   **Indicadores Financieros:** Honorarios por cobrar (visible solo para roles autorizados).
*   **Últimos Movimientos:** Feed de actividad reciente en los casos asignados.

### 4.2. MÓDULO: GESTIÓN DE CLIENTES
Repositorio centralizado de la información de contacto y fiscal.
*   **Tipos de Cliente:** Persona Natural (Cédula) / Persona Jurídica (RUC).
*   **Ficha del Cliente:**
    *   Datos de identidad y contacto.
    *   Representante legal (para P. Jurídicas).
    *   **Historial 360:** Visión unificada de todos los casos, documentos, facturas y saldos del cliente.
    *   Estado: Potencial (Prospecto), Activo, Inactivo.

### 4.3. MÓDULO: GESTIÓN DE PROCESOS (CASOS)
El núcleo del sistema ("El Expediente Digital"). Debe reflejar la estructura de los procesos en el Consejo de la Judicatura.

#### Clasificación por Materia
*   Civil, Penal, Laboral, Familia (Niñez y Adolescencia), Tránsito, Contencioso Administrativo/Tributario, Constitucional, Inquilinato, Mediación/Arbitraje.

#### Ficha del Proceso
*   **Datos de Cabecera:**
    *   Código Interno y **Número de Proceso Judicial** (formato estándar Función Judicial).
    *   Unidad Judicial / Juzgado, Cantón y Provincia.
    *   Juez y Secretario (si aplica).
*   **Partes Procesales:** Actor/Ofendido vs. Demandado/Procesado.
*   **Detalles del Caso:** Pretensión, Cuantía, Estado Procesal (Iniciado, Etapa de Prueba, Sentencia, Ejecución, Archivo).
*   **Bitácora Cronológica:** Timeline inalterable de cada actuación (presentación de demanda, calificación, citación, audiencia, sentencia).

### 4.4. MÓDULO: AGENDA LEGAL Y PLAZOS (CALCULADORA DE TÉRMINOS)
*   **Eventos:** Audiencias (Presenciales/Zoom), Diligencias (Inspecciones judicial, Peritajes), Reuniones.
*   **Cálculo de Plazos:**
    *   Sistema inteligente para configurar alertas de términos (días hábiles) y plazos (días calendario).
    *   Recordatorios configurables (e.g., 5 días antes, 1 día antes, día del vencimiento).
*   **Vistas:** Calendario tipo Google Calendar (Diario, Semanal, Mensual).
*   **Sincronización:** Capacidad técnica para futura integración con Google Calendar/Outlook (definido en capa no visual).

### 4.5. MÓDULO: GESTIÓN DOCUMENTAL
Sistema de gestión de archivos (DMS) integrado.
*   **Organización:** Carpetas automáticas por Caso > Etapa Procesal.
*   **Tipos Documentales:** Demandas, Escritos, Providencias, Sentencias, Boletas, Pruebas, Facturas.
*   **Funcionalidades:**
    *   Previsualización de PDFs y Word.
    *   Versionado de documentos (borrador, versión final, versión firmada).
    *   Búsqueda por metadatos (fecha, tipo, nombre).

### 4.6. MÓDULO: TAREAS Y SEGUIMIENTO (WORKFLOW)
*   **Asignación:** Delegación de tareas específicas (e.g., "Revisar casillero", "Redactar alegato") a miembros del equipo.
*   **Estados:** Pendiente, En Progreso, Requerimiento de Info, Completado.
*   **Vinculación:** Cada tarea se enlaza a un Caso y/o Cliente específico.

### 4.7. MÓDULO: HONORARIOS Y FACTURACIÓN
Gestión económica del estudio.
*   **Modelos de Cobro:**
    *   Iguala Mensual (Retainer).
    *   Por horas (Time tracking).
    *   Tarifa fija por etapa procesal.
    *   Cuota Litis (Éxito).
*   **Registro de Gastos:** Tasas judiciales, copias, movilización (reembolsables/no reembolsables).
*   **Control de Saldos:** Total pactado vs. Total facturado vs. Total cobrado.

### 4.8. MÓDULO: REPORTES E INTELIGENCIA DE NEGOCIOS
*   **Operativos:** Casos por estado, carga de trabajo por abogado (casos activos), próximos vencimientos.
*   **Estratégicos:** Tasa de éxito (ganados vs. perdidos), rentabilidad por tipo de caso, clientes más rentables.
*   **Financieros:** Flujo de caja, antigüedad de cartera.

---

## 5. CAPAS DEL SISTEMA (NO VISUALES / BACKEND CONCEPTUAL)

### A. Autenticación y Seguridad
*   Gestión de sesiones seguras (JWT/OAuth).
*   **Encriptación:** Datos sensibles en reposo y en tránsito.
*   Política de contraseñas fuertes y 2FA (Doble Factor de Autenticación) opcional.
*   Control de concurrencia (evitar doble login si se requiere).

### B. Motor de Facturación y Finanzas
*   Lógica para generación de proformas y pre-facturas.
*   Estructura de datos compatible con facturación electrónica (SRI) para futura integración XML/API.
*   Manejo de impuestos (IVA, Retenciones).

### C. Administración y Configuración
*   **Catálogos del Sistema:** Gestión centralizada de Juzgados, Materias, Tipos de Juicio (CRUD administrativo).
*   **Parametrización de Despacho:** Configuración de logo, datos fiscales del estudio, pie de firma de correos.

### D. Integraciones y Exportabilidad
*   **Arquitectura API First:** Diseño preparado para conectar con servicios externos.
*   Exportación de datos a Excel/CSV y PDFs generados automáticamente para reportes.
*   Importación masiva de clientes/casos desde plantillas Excel (Onboarding).

### E. Aspectos Legales y Compliance
*   **Términos y Condiciones:** Aceptación obligatoria al primer ingreso.
*   **Audit Log (Trazabilidad):** Registro inmutable de acciones críticas (¿Quién borró el documento X? ¿Quién cambió el estado del caso Y?).
*   **Backup:** Políticas de respaldo diario automático.

---

## 6. REQUERIMIENTOS NO FUNCIONALES (CALIDAD)

1.  **Usabilidad (UX):** Interfaz limpia, minimalista y profesional. Uso de terminología legal correcta (no "usuario", sino "cliente/patrocinado"; no "ticket", sino "caso/proceso").
2.  **Performance:** Carga rápida de expedientes grandes. Optimización de consultas a base de datos.
3.  **Escalabilidad:** Arquitectura lista para soportar desde un abogado individual hasta un estudio con 50+ usuarios.
4.  **Disponibilidad:** SLA objetivo del 99.9%.

---

## 7. CONCLUSIÓN

Esta especificación proporciona la hoja de ruta para construir un **Ecosistema Legal Digital** robusto. No es solo un repositorio de PDF, sino una herramienta activa que ayuda al abogado ecuatoriano a mitigar el riesgo procesal (pérdida de plazos) y maximizar la rentabilidad de su práctica.
