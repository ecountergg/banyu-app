export class MeterReadingDto {
    meterNumber!: string;
    readingDate!: number | Date;
    previousReading!: number;
    currentReading!: number;
    notes!: string | null;
    version!: number;

    setMeterNumber(meterNumber: string): this {
        this.meterNumber = meterNumber;
        return this;
    }

    setReadingDate(readingDate: number | Date): this {
        this.readingDate = readingDate;
        return this;
    }

    setPreviousReading(previousReading: number): this {
        this.previousReading = previousReading;
        return this;
    }

    setCurrentReading(currentReading: number): this {
        this.currentReading = currentReading;
        return this;
    }

    setNotes(notes: string | null): this {
        this.notes = notes;
        return this;
    }

    setVersion(version: number): this {
        this.version = version;
        return this;
    }
}
