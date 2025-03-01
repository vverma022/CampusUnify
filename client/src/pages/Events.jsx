import PageLayout from '../styles/PageLayout';
import SpinnerMini from '../ui/SpinnerMini';
import SearchFilter from '../ui/SearchFilter';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './../features/authentication/useUser';
import { useEvents } from '../features/events/useEvents';
import { formatDateTimeEvent } from '../utils/helpers';
import AddEvent from '../features/events/AddEvent';
import EventMenu from '../features/events/EventMenu';
import { Context } from '../main';

export default function Events() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isDarkMode } = useContext(Context);

  const { events = [], isLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('all');
  const [dateQuery, setDateQuery] = useState(new Date('1970-01-01'));
  const [sortQuery, setSortQuery] = useState('all');

  const filteredEvents = filterAndSortEvents();

  function filterAndSortEvents() {
    if (!events.length) return [];

    const filterDate = dateQuery ? new Date(dateQuery) : null;

    const filteredEvents = events
      .filter((event) => {
        const matchesSearch =
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          categoryQuery === 'all' || event.category === categoryQuery;

        const matchesDate = filterDate
          ? new Date(event.date).getTime() >= filterDate.getTime()
          : true;

        return matchesSearch && matchesCategory && matchesDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (sortQuery === 'upcoming') {
          return dateA.getTime() - dateB.getTime();
        } else if (sortQuery === 'past') {
          return dateB.getTime() - dateA.getTime();
        }
        return 0;
      });

    return filteredEvents;
  }

  return (
    <PageLayout>
      <div
        className={`w-[80%] mx-auto transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <h2 className="text-3xl font-bold mt-4">Events</h2>
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryQuery={categoryQuery}
          setCategoryQuery={setCategoryQuery}
          dateQuery={dateQuery}
          setDateQuery={setDateQuery}
          sortQuery={sortQuery}
          setSortQuery={setSortQuery}
        />
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <>
            {user.role === 'club' && <AddEvent />}
            <div className="mt-4 flex flex-col gap-4 mb-24">
              {filteredEvents.length === 0 ? (
                <p className="text-xl">No events match your filters</p>
              ) : (
                filteredEvents.map((event) => (
                  <div key={event._id} className="flex gap-4">
                    <div
                      className="flex gap-4 hover:cursor-pointer"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      <img
                        src={event.cardImage}
                        className="w-20 h-20 rounded-lg"
                        alt="Event cover image"
                      />
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold">{event.name}</p>
                        <p className="text-primary-900">
                          {formatDateTimeEvent(event.date)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto justify-center my-auto">
                      <EventMenu event={event} user={user} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
