#include "view.h"
#include "utils.h"
#include <QKeyEvent>
#include <QApplication>

View::View()
{
    for (int i=0; i<PLAYER_COUNT; i++)
        m_gameThread[i] = new GameThread(
            new GameScene(this),
            this
        );

    GameScene* m_gameScenes[PLAYER_COUNT];
    for (int i=0; i<PLAYER_COUNT; i++)
    {
        m_gameScenes[i] = m_gameThread[i]->getGameScene();
        setScene(m_gameScenes[i]);
        // resize(
        //     (m_gameScenes[i]->sceneRect().width() +2+50)*PLAYER_COUNT,
        //     (m_gameScenes[i]->sceneRect().height()+2+50)*PLAYER_COUNT);
    }

    setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
    setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);

    for (int i=0; i<PLAYER_COUNT; i++)
        m_gameThread[i]->start();
}

void View::keyReleaseEvent(QKeyEvent *event)
{
    if(event->key() == Qt::Key_Escape)
    {
        QApplication::instance()->quit();
    }
    QGraphicsView::keyReleaseEvent(event);
}
