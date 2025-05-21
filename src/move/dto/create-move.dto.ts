export class CreateMoveDto {
  from: string;
  to: string;
  byUserId: number; // ✅ must match Move model and service code
}
