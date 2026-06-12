create type intake_status as enum (
  'new',
  'reviewing',
  'qualified',
  'declined',
  'contacted'
);

create table secure_intake_submissions (
  id uuid primary key,
  status intake_status not null default 'new',
  created_at timestamptz not null,
  retention_until timestamptz not null,
  encryption_algorithm text not null check (encryption_algorithm = 'aes-256-gcm'),
  encryption_iv text not null,
  encryption_auth_tag text not null,
  encrypted_payload text not null,
  reviewed_at timestamptz,
  reviewed_by text
);

create index secure_intake_status_created_idx
  on secure_intake_submissions (status, created_at desc);

create index secure_intake_retention_idx
  on secure_intake_submissions (retention_until);

-- Ejecutar diariamente desde el proveedor administrado.
delete from secure_intake_submissions
where retention_until < now();
