"use client";

import { Note } from "@/types/types";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { Chord } from "tonal";
import { detect } from "@tonaljs/chord-detect";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { getUserFavouriteChords } from "@/redux/features/favourite-chords-slice";
import FavouriteChordButton from "../FavouriteChordButton/FavouriteChordButton";

export default function Piano({
    selectedNotes,
    setSelectedNotes,
}: {
    selectedNotes: any[];
    setSelectedNotes: Dispatch<SetStateAction<any[]>>;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const [currentChord, setCurrendChord] = useState<string[]>([]);
    const authUserId = useSelector(selectUserUid);

    const notes: Array<Note> = [
        {
            id: "C1",
            name: "C",
            type: "white",
        },
        {
            id: "C#1,Db1",
            name: "C#",
            type: "black",
        },
        {
            id: "D1",
            name: "D",
            type: "white",
        },
        {
            id: "D#1,Eb1",
            name: "D#",
            type: "black",
        },
        {
            id: "E1",
            name: "E",
            type: "white",
        },
        {
            id: "F1",
            name: "F",
            type: "white",
        },
        {
            id: "F#1,Gb1",
            name: "F#",
            type: "black",
        },
        {
            id: "G1",
            name: "G",
            type: "white",
        },
        {
            id: "G#1,Ab1",
            name: "G#",
            type: "black",
        },
        {
            id: "A1",
            name: "A",
            type: "white",
        },
        {
            id: "A#1,Bb1",
            name: "A#",
            type: "black",
        },
        {
            id: "B1",
            name: "B",
            type: "white",
        },
        {
            id: "C2",
            name: "C",
            type: "white",
        },
        {
            id: "C#2,Db2",
            name: "C#",
            type: "black",
        },
        {
            id: "D2",
            name: "D",
            type: "white",
        },
        {
            id: "D#2,Eb2",
            name: "D#",
            type: "black",
        },
        {
            id: "E2",
            name: "E",
            type: "white",
        },
        {
            id: "F2",
            name: "F",
            type: "white",
        },
        {
            id: "F#2,Gb2",
            name: "F#",
            type: "black",
        },
        {
            id: "G2",
            name: "G",
            type: "white",
        },
        {
            id: "G#2,Ab2",
            name: "G#",
            type: "black",
        },
        {
            id: "A2",
            name: "A",
            type: "white",
        },
        {
            id: "A#2,Bb2",
            name: "A#",
            type: "black",
        },
        {
            id: "B2",
            name: "B",
            type: "white",
        },
        {
            id: "C3",
            name: "C",
            type: "white",
        },
    ];

    const noteCss = "cursor-pointer ";
    const whiteNoteCss =
        "h-72 bg-slate-100 w-[70px] relative border-solid border-l-[2px] border-slate-200 -ml-[20px]";
    const blackNoteCss = "h-48 w-14 bg-gray-900 w-[44px] z-10 -ml-8";

    const repaintNotes = () => {
        const notesElements = Array.from(
            document.querySelectorAll("#notes > li")
        );

        // Clean piano notes selection
        notesElements.forEach((el) => {
            if (el.getAttribute("data-type") === "white") {
                el.classList.add("bg-slate-100");
                el.classList.remove("bg-green-400");
            } else {
                el.classList.add("bg-gray-900");
                el.classList.remove("bg-cyan-400");
            }

            el.setAttribute("data-selected", "false");
        });

        if (selectedNotes.length == 0) return;

        // Paint selected notes
        selectedNotes.forEach((selectedNote) => {
            const element = notesElements.filter(
                (_, index) => index == selectedNote.index
            )[0];

            if (!element) return;

            if (selectedNote.type === "white") {
                element.classList.remove("bg-slate-100");
                element.classList.add("bg-green-400");
            } else {
                element.classList.remove("bg-gray-900");
                element.classList.add("bg-cyan-400");
            }

            element.setAttribute("data-selected", "true");
        });
    };

    const highlightNote = (event: React.MouseEvent, note: Note) => {
        event.stopPropagation();

        const element = event.target as HTMLElement;
        const selected = element.getAttribute("data-selected");
        const selectedIndex = [
            ...Array.from(document.querySelectorAll("[data-note]")),
        ].indexOf(element);

        const noteItem = {
            index: selectedIndex,
            ...note,
        };

        if (selected === "false") {
            //element.setAttribute("data-selected", "true");

            setSelectedNotes((prev) => [...prev, noteItem]);
        } else {
            //selement.setAttribute("data-selected", "false");

            setSelectedNotes((prev) => [
                ...prev.filter((n) => n.id != note.id),
            ]);
        }
    };

    const orderNotes = (a: any, b: any) => {
        if (a.index < b.index) {
            return -1;
        }
        if (a.index > b.index) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        if (selectedNotes.length > 0) {
            setCurrendChord(() =>
                Chord.detect(selectedNotes.sort(orderNotes), {
                    assumePerfectFifth: true,
                })
            );
        }

        repaintNotes();
    }, [selectedNotes]);

    return (
        <div>
            <div className="text-slate-100 flex justify-between items-center gap-4">
                <div className="flex gap-4 items-center">
                    {selectedNotes.length > 0 || currentChord.length > 0 ? (
                        currentChord.map((chord, index) => {
                            if (index === 0) {
                                return (
                                    <h1
                                        className="text-5xl font-semibold mb-2"
                                        key={chord}
                                    >
                                        {chord}
                                    </h1>
                                );
                            }

                            return (
                                <span className="text-slate-200" key={chord}>
                                    {chord},{" "}
                                </span>
                            );
                        })
                    ) : (
                        <h2 className="text-xl">
                            Highlight some notes to detech the chord!
                        </h2>
                    )}
                </div>

                <FavouriteChordButton
                    chord={currentChord[0]}
                    selectedNotes={selectedNotes}
                />
            </div>

            {/*
            <ul className="flex gap-4">
                {selectedNotes.length > 0 &&
                    selectedNotes
                        .sort(orderNotes)
                        .map((note) => <li key={note.id}>{note.name}</li>)}
            </ul>
            */}

            <ul id="notes" className="flex ml-[20px] mt-6">
                {notes.map((note) => (
                    <li
                        key={note.id}
                        data-selected="false"
                        data-note={note.name}
                        data-type={note.type}
                        onClick={(event) => highlightNote(event, note)}
                        className={`${noteCss} ${
                            note.type === "white" ? whiteNoteCss : blackNoteCss
                        }`}
                    ></li>
                ))}
            </ul>
        </div>
    );
}
