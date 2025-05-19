export class WaterBillDto {
    notes!: string | null;

    setNotes(notes: string | null): this {
        this.notes = notes;
        return this;
    }
}
