export class MemberDto {
    codeArea!: string;
    fullName!: string;
    email!: string | null;
    mobileNumber!: string | null;
    initialReading!: number | null;

    setAreaCode(codeArea: string): this {
        this.codeArea = codeArea;
        return this;
    }

    setFullname(fullName: string): this {
        this.fullName = fullName;
        return this;
    }

    setEmail(email: string | null): this {
        this.email = email;
        return this;
    }

    setMobileNumber(mobileNumber: string | null): this {
        this.mobileNumber = mobileNumber;
        return this;
    }

    setInitialReading(initialReading: number | null): this {
        this.initialReading = initialReading;
        return this;
    }
}
