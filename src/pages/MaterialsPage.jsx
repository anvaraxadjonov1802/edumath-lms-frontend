import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getTopicMaterials } from '../api/materialApi';

const materialTypes = [
  { label: 'Nazariy qism', value: 'theory' },
  { label: 'Amaliy qism', value: 'practice' },
  { label: 'Prezentatsiya', value: 'presentation' },
  { label: 'Mustaqil ish', value: 'assignment' },
  { label: 'Adabiyot', value: 'literature' },
  { label: 'Boshqa', value: 'other' },
];

export default function MaterialsPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedType = searchParams.get('type') || 'theory';

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedTypeLabel =
    materialTypes.find((item) => item.value === selectedType)?.label ||
    'Materiallar';

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getTopicMaterials(id, selectedType);

        // setMaterials(data.results || []);
        setMaterials(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            'Materiallarni yuklashda xatolik yuz berdi'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [id, selectedType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Link
            to={`/topics/${id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Mavzuga qaytish
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {selectedTypeLabel}
          </h1>

          <p className="mt-2 text-slate-600">
            Ushbu mavzuga oid materiallar ro‘yxati.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {materialTypes.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setSearchParams({ type: item.value })}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              selectedType === item.value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Materiallar yuklanmoqda...</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && materials.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">
            Hozircha material mavjud emas
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Bu bo‘limga hali fayl qo‘shilmagan.
          </p>
        </div>
      )}

      {!loading && !error && materials.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {materials.map((material) => (
            <div
              key={material.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-blue-600">
                {material.material_type_display}
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {material.title}
              </h3>

              {material.description && (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {material.description}
                </p>
              )}

              <div className="mt-5">
                {material.file_url || material.external_url ? (
                  <a
                    href={material.file_url || material.external_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Faylni ochish
                  </a>
                ) : (
                  <span className="text-sm text-slate-500">
                    Fayl biriktirilmagan
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}