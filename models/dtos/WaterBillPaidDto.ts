export class WaterBillPaidDto {
    notes!: string | null;

    setNotes(notes: string | null): this {
        this.notes = notes;
        return this;
    }
}
