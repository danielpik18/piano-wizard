"use client";

import FavouriteChords from "@/components/FavouriteChords/FavouriteChords";
import WithAuth from "@/components/HOC/WithAuth";
import Piano from "@/components/Piano/Piano";
import { Note } from "@/types/types";
import React, { useState } from "react";

function DetectChord() {
    const [selectedNotes, setSelectedNotes] = useState<Array<Note>>([]);

    return (
        <div className="flex flex-col gap-10 items-center justify-center bg-zinc-700 w-screen max-w-screen h-screen">
            <Piano
                selectedNotes={selectedNotes}
                setSelectedNotes={setSelectedNotes}
            />
            <FavouriteChords setSelectedNotes={setSelectedNotes} />
        </div>
    );
}

export default WithAuth(DetectChord);
