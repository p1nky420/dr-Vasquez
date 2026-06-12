# Configuración del intake seguro

El endpoint `POST /api/intake` valida datos mínimos, verifica Cloudflare Turnstile, cifra el payload con AES-256-GCM y lo envía a un adaptador privado de almacenamiento.

## Contrato del adaptador de almacenamiento

`INTAKE_STORAGE_URL` debe aceptar un `POST` autenticado con `Bearer INTAKE_STORAGE_TOKEN`.

Payload:

```json
{
  "id": "uuid",
  "status": "new",
  "createdAt": "ISO-8601",
  "retentionUntil": "ISO-8601",
  "encrypted": {
    "algorithm": "aes-256-gcm",
    "iv": "base64",
    "authTag": "base64",
    "payload": "base64"
  }
}
```

El servicio conectado debe persistir este registro en Postgres administrado con cifrado en reposo, auditoría de acceso y eliminación al alcanzar `retentionUntil`.
El esquema base se encuentra en `docs/intake-schema.sql`.

Estados permitidos: `new`, `reviewing`, `qualified`, `declined`, `contacted`.

## Notificaciones

`INTAKE_NOTIFICATION_WEBHOOK_URL` recibe únicamente ID, fecha y urgencia. Nunca recibe nombres, contactos ni detalles del asunto.

## Requisitos antes de producción

1. Configurar todas las variables de `.env.example`.
2. Crear el adaptador privado y la tabla Postgres.
3. Implementar panel autenticado para revisión y cambio de estado.
4. Probar rotación de clave, eliminación y respuesta a incidentes.
5. Obtener aprobación legal del aviso de admisión y política de retención.

El endpoint falla cerrado si Turnstile, cifrado o almacenamiento no están configurados. Esto evita aceptar solicitudes que no puedan protegerse correctamente.
